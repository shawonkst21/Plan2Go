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
	GetUsrPassword(email string) (string, error)
}

type userRepo struct {
	dbCon *sql.DB
}

func NewUserRepo( dbCon *sql.DB) UserRepo {
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
func (r *userRepo) GetUsrPassword(email string) (string, error) {
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