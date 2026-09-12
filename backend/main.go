package main

import (
	"log"
	"razorpay-go-demo/config"
	"razorpay-go-demo/handlers"

	"github.com/gin-gonic/gin"
)

func main() {
	// Load configuration
	cfg := config.LoadConfig()

	// Initialize Gin router
	r := gin.Default()

	// Routes
	r.POST("/create-order", handlers.CreateOrder(cfg))
	r.GET("/get-key", handlers.GetKey(cfg))
	r.POST("/payment-callback", handlers.PaymentCallback(cfg))

	r.GET("/", func(c *gin.Context) {
		c.JSON(200, gin.H{"service": "razorpay-integration", "status": "ok"})
	})

	// Start server
	log.Printf("Server starting on port %s", cfg.Port)
	r.Run(":" + cfg.Port)
}
