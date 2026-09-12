package handlers

import (
	"net/http"
	"razorpay-go-demo/config"
	"razorpay-go-demo/models"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/razorpay/razorpay-go"
)

func CreateOrder(cfg *config.Config) gin.HandlerFunc {
	return func(c *gin.Context) {
		var req models.OrderRequest
		if err := c.ShouldBindJSON(&req); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		// Initialize Razorpay client
		client := razorpay.NewClient(cfg.RazorpayKeyID, cfg.RazorpayKeySecret)

		// Create order data
		data := map[string]interface{}{
			"amount":   req.Amount * 100, // Amount in paisa
			"currency": req.Currency,
			"receipt":  "order_" + strconv.FormatInt(time.Now().Unix(), 10),
		}

		// Create order
		order, err := client.Order.Create(data, nil)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create order"})
			return
		}

		response := models.OrderResponse{
			ID:       order["id"].(string),
			Amount:   int(order["amount"].(float64)),
			Currency: order["currency"].(string),
			Status:   order["status"].(string),
		}

		c.JSON(http.StatusOK, response)
	}
}

func GetKey(cfg *config.Config) gin.HandlerFunc {
	return func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"key": cfg.RazorpayKeyID})
	}
}
