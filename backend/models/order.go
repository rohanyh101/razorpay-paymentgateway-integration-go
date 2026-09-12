package models

type OrderRequest struct {
	Amount   int    `json:"amount"`
	Currency string `json:"currency"`
}

type OrderResponse struct {
	ID       string `json:"id"`
	Amount   int    `json:"amount"`
	Currency string `json:"currency"`
	Status   string `json:"status"`
}
