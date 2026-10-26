#include <stdio.h>

typedef struct {
    char nome[31];
    int horas;
    int minutos;
    int segundos;
    int total;
} Corredor;

void inserir_ordenado(Corredor top[], int *qtd, int k, Corredor novo) {
    int i = -1;

    if (*qtd < k) {
        i = *qtd;
        *qtd = *qtd + 1;
    } else if (novo.total < top[k - 1].total) {
        i = k - 1;
    }

    if (i != -1) {
        while (i > 0 && top[i - 1].total > novo.total) {
            top[i] = top[i - 1];
            i--;
        }
        top[i] = novo;
    }
}

int main() {
    int n, k, i;
    int qtd;
    Corredor atual;
    Corredor top[1000];

    while (scanf("%d %d", &n, &k) == 2) {
        qtd = 0;

        for (i = 0; i < n; i++) {
            scanf("%s %d %d %d", atual.nome, &atual.horas, &atual.minutos, &atual.segundos);
            atual.total = atual.horas * 3600 + atual.minutos * 60 + atual.segundos;
            inserir_ordenado(top, &qtd, k, atual);
        }

        for (i = 0; i < qtd; i++) {
            printf("%s %d %d %d\n", top[i].nome, top[i].horas, top[i].minutos, top[i].segundos);
        }
    }

    return 0;
}
