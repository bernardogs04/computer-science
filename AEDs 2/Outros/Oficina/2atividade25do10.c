#include <stdio.h>
#include <string.h>

typedef struct {
    int nota;
    int faltas;
    char nome[51];
} Aluno;

int vem_antes(Aluno a, Aluno b) {
    int resultado;

    if (a.nota != b.nota) {
        resultado = a.nota > b.nota;
    } else if (a.faltas != b.faltas) {
        resultado = a.faltas < b.faltas;
    } else {
        resultado = strcmp(a.nome, b.nome) < 0;
    }

    return resultado;
}

void trocar(Aluno *a, Aluno *b) {
    Aluno temp = *a;
    *a = *b;
    *b = temp;
}

int particionar(Aluno v[], int inicio, int fim) {
    Aluno pivo = v[fim];
    int i = inicio - 1;
    int j;

    for (j = inicio; j < fim; j++) {
        if (vem_antes(v[j], pivo)) {
            i++;
            trocar(&v[i], &v[j]);
        }
    }

    trocar(&v[i + 1], &v[fim]);
    return i + 1;
}

void quicksort_parcial(Aluno v[], int inicio, int fim, int k) {
    int p;

    if (inicio < fim) {
        p = particionar(v, inicio, fim);
        quicksort_parcial(v, inicio, p - 1, k);

        if (p < k - 1) {
            quicksort_parcial(v, p + 1, fim, k);
        }
    }
}

int main() {
    int n, k, i;
    Aluno alunos[10000];

    while (scanf("%d %d", &n, &k) == 2) {
        for (i = 0; i < n; i++) {
            scanf("%d %d %[^\n]", &alunos[i].nota, &alunos[i].faltas, alunos[i].nome);
        }

        quicksort_parcial(alunos, 0, n - 1, k);

        for (i = 0; i < k; i++) {
            printf("%d %d %s\n", alunos[i].nota, alunos[i].faltas, alunos[i].nome);
        }
    }

    return 0;
}
