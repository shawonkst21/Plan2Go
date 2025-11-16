package repo

import "database/sql"

type User struct {
	ID       int    `json:"id"`
	Username string `json:"username"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

type UserRepo interface {
	CreateUser(user User) (*User, error)
	GetUserByEmail(email string) (*User, error)
	GetUserPassword(email string) (string, error)
	UpdatePassword(email, HashedPassword string) (*User, error)
}

type userRepo struct {
	dbCon *sql.DB
}

func NewUserRepo(dbCon *sql.DB) UserRepo {
	return &userRepo{
		dbCon: dbCon,
	}
}

func (r *userRepo) CreateUser(user User) (*User, error) {

	query := `
		INSERT INTO users (username, email, password)
		VALUES (?, ?, ?)
	`

	result, err := r.dbCon.Exec(query, user.Username, user.Email, user.Password)
	if err != nil {
		return nil, err
	}

	id, err := result.LastInsertId()
	if err != nil {
		return nil, err
	}
	user.ID = int(id)
	return &user, nil
}
func (r *userRepo) GetUserByEmail(email string) (*User, error) {
	query := `
		SELECT id, username, email, password
		FROM users
		WHERE email = ?
		LIMIT 1
	`

	user := &User{}
	err := r.dbCon.QueryRow(query, email).Scan(
		&user.ID,
		&user.Username,
		&user.Email,
		&user.Password,
	)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, nil // no user found
		}
		return nil, err
	}

	return user, nil
}
func (r *userRepo) GetUserPassword(email string) (string, error) {
	query := `
		SELECT password
		FROM users
		WHERE email = ?
		LIMIT 1
	`

	var password string
	err := r.dbCon.QueryRow(query, email).Scan(&password)
	if err != nil {
		if err == sql.ErrNoRows {
			return "", nil // no user found
		}
		return "", err
	}

	return password, nil
}

func (r *userRepo) UpdatePassword(email, HashedPassword string) (*User, error) {
	// 1. Update the password
	updateQuery := `
		UPDATE users
		SET password = ?
		WHERE email = ?
	`
	_, err := r.dbCon.Exec(updateQuery, HashedPassword, email)
	if err != nil {
		return nil, err
	}

	// 2. Return the updated user
	return r.GetUserByEmail(email)
}
