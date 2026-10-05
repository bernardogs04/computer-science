#include <stdio.h>

void insercao(int vetor[]) {

    for (int i = 1; i < 10; i++) {
        int troca = vetor[i];
        int j = i - 1;

        while (j >= 0 && vetor[j] > troca) {
            vetor[j + 1] = vetor[j];
            j--;
        }

        vetor[j + 1] = troca;
    }
}

int main() {
    int vetor[10] = {5, 25, 92, 15, 73, 31, 8, 45, 67, 0};

    insercao(vetor);

    for (int i = 0; i < 10; i++) {
        printf("%d ", vetor[i]);
    }

    return 0;
}
