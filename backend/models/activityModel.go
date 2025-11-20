package models

import "time"

type Activity struct {
    ID          int       `db:"id"`
    UserID      int       `db:"user_id"`
    Action      string    `db:"action"`
    Description string    `db:"description"`
    CreatedAt   time.Time `db:"created_at"`
}
