---
title: Rust Sample
---

```rust
use std::error::Error;

fn main() -> Result<(), Box<dyn Error>> {
    // Testing: match, fat arrows =>, and turbofish ::<>
    let numbers = vec![1, 2, 3, 0];
    
    let processed: Vec<i32> = numbers
        .iter()
        .filter(|&&x| x != 0)
        .map(|&x| x * 2)
        .collect();

    match processed.first() {
        Some(val) => println!("First element: {}", val),
        None => println!("Vector is empty!"),
    }

    Ok(())
}
```
