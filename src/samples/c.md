---
title:  C Sample
---

```c
#include <stdio.h>
#include <stdlib.h>

#define MAX_SIZE 1024
#define SUCCESS 0

int main(int argc, char **argv) {
    // Testing: pointers *, address &, and increment ++
    int value = 100;
    int *ptr = &value;
    
    char *buffer = (char *)malloc(MAX_SIZE * sizeof(char));
    
    if (ptr != NULL) {
        printf("Addr: %p, Val: %d\n", (void*)ptr, *ptr);
    }

    free(buffer);
    return SUCCESS;
}
```
