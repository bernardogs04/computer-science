#include <stdio.h>

void bolha (int vetor[]) {
    int i, j, troca;

    for (i = 0; i < 10 - 1; i++) {
        for (j = 0; j < 10 - 1 - i; j++) {
            if (vetor[j] > vetor[j + 1]) {
                troca = vetor[j];
                vetor[j] = vetor[j + 1];
                vetor[j + 1] = troca;
            }
        }
    }
}

int main() {
    int vetor[] = {52, 12, 94, 71, 7, 358, 83, 40, 67, 110};

    bolha(vetor);

    for (int i = 0; i < 10; i++) {
        printf("%d ", vetor[i]);
    }

    return 0;
}
