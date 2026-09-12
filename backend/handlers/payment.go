package handlers

import (
	"net/http"
	"razorpay-go-demo/config"

	"github.com/gin-gonic/gin"
	"github.com/razorpay/razorpay-go/utils"
)

func PaymentCallback(cfg *config.Config) gin.HandlerFunc {
	return func(c *gin.Context) {
		// Get form data from callback
		razorpayOrderID := c.PostForm("razorpay_order_id")
		razorpayPaymentID := c.PostForm("razorpay_payment_id")
		razorpaySignature := c.PostForm("razorpay_signature")

		// Verify payment signature using Razorpay SDK Utils
		// Create params map as required by the function
		params := map[string]interface{}{
			"razorpay_order_id":   razorpayOrderID,
			"razorpay_payment_id": razorpayPaymentID,
		}

		// Use utils.VerifyPaymentSignature for signature verification
		isValid := utils.VerifyPaymentSignature(params, razorpaySignature, cfg.RazorpayKeySecret)

		if !isValid {
			// Payment verification failed
			c.Redirect(http.StatusFound, "/failure.html")
			return
		}

		// Payment verified successfully - pass all parameters to success page
		c.Redirect(http.StatusFound, "/success.html?orderId="+razorpayOrderID+"&paymentId="+razorpayPaymentID+"&signature="+razorpaySignature)
	}
}
