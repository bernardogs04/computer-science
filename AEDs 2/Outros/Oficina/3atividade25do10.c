#include <stdio.h>
#include <string.h>

typedef struct {
    int premios;
    int ano;
    char titulo[101];
} Filme;

int vem_antes(Filme a, Filme b) {
    int resultado;

    if (a.premios != b.premios) {
        resultado = a.premios > b.premios;
    } else if (a.ano != b.ano) {
        resultado = a.ano < b.ano;
    } else {
        resultado = strcmp(a.titulo, b.titulo) < 0;
    }

    return resultado;
}

void trocar(Filme *a, Filme *b) {
    Filme temp = *a;
    *a = *b;
    *b = temp;
}

void peneirar(Filme v[], int i, int tamanho) {
    int melhor = i;
    int esq = 2 * i + 1;
    int dir = 2 * i + 2;

    if (esq < tamanho && vem_antes(v[esq], v[melhor])) {
        melhor = esq;
    }

    if (dir < tamanho && vem_antes(v[dir], v[melhor])) {
        melhor = dir;
    }

    if (melhor != i) {
        trocar(&v[i], &v[melhor]);
        peneirar(v, melhor, tamanho);
    }
}

void heapsort_parcial(Filme v[], int n, int k) {
    int i;
    int tamanho = n;

    for (i = n / 2 - 1; i >= 0; i--) {
        peneirar(v, i, tamanho);
    }

    for (i = 0; i < k; i++) {
        trocar(&v[0], &v[tamanho - 1]);
        tamanho--;
        peneirar(v, 0, tamanho);
    }
}

int main() {
    int n, k, i;
    Filme filmes[10000];

    while (scanf("%d %d", &n, &k) == 2) {
        for (i = 0; i < n; i++) {
            scanf("%d %d %[^\n]", &filmes[i].premios, &filmes[i].ano, filmes[i].titulo);
        }

        heapsort_parcial(filmes, n, k);

        for (i = n - 1; i >= n - k; i--) {
            printf("%d %d %s\n", filmes[i].premios, filmes[i].ano, filmes[i].titulo);
        }
    }

    return 0;
}
