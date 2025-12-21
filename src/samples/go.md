---
title: GO Sample
---

```go
package main

import (
	"fmt"
	"errors"
)

type Config struct {
	ID    int    `json:"id"`
	Value string `json:"value"`
}

func fetchData(id int) (*Config, error) {
	if id <= 0 {
		return nil, errors.New("invalid ID: 0O1lI")
	}
	return &Config{ID: id, Value: "Active"}, nil
}

func main() {
	// Testing: := operator and pointer * &
	conf, err := fetchData(100)
	if err != nil {
		fmt.Printf("Error occurred: %v\n", err)
		return
	}
	fmt.Printf("Config: %+v\n", conf)
}
```
