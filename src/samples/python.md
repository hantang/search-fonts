---
title:  Python Sample
---

```python
import math

def calculate_pi_areas(radii: list[int]) -> dict:
    """Classic Pythonic way to process data."""
    # Testing: 0 vs O, 1 vs l vs I, and -> operator
    data_map = {f"radius_{r}": math.pi * (r ** 2) for r in radii if r > 0}
    
    for label, area in data_map.items():
        print(f"Label: {label:10} | Area: {area:.2f}")
    
    return data_map

if __name__ == "__main__":
    test_radii = [1, 5, 10, 0]
    calculate_pi_areas(test_radii)
```
