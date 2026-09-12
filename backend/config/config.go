package config

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

type Config struct {
	RazorpayKeyID     string
	RazorpayKeySecret string
	Port              string
}

func LoadConfig() *Config {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	return &Config{
		RazorpayKeyID:     os.Getenv("RAZORPAY_KEY_ID"),
		RazorpayKeySecret: os.Getenv("RAZORPAY_KEY_SECRET"),
		Port:              os.Getenv("PORT"),
	}
}
