#include <stdio.h>

int vetor[10];
int contador = 0;

void inserirFim(int valor){
	if (contador >= 10){
		printf("Pilha cheia\n");
		return;
	}
	vetor[contador] = valor;
	contador++;
}

int removerFim(){
	if (contador == 0){
		printf("Pilha vazia\n");
		return -1;
	}
	contador--;
	return vetor[contador];
}

void imprimirVetor(){
	printf("Pilha atual (base -> topo): ");
	for (int i = 0; i < contador; i++){
		printf("%d ", vetor[i]);
	}
	printf("\n");
}

int main(){
	int valor, opcao, valorRetirado;

	printf("0-Sair, 1-Inserir (push), 2-Remover (pop)\n");
	scanf("%d", &opcao);

	while (opcao != 0){

		if (opcao == 1){
			printf("Valor: ");
			scanf("%d", &valor);
			inserirFim(valor);
			imprimirVetor();
		}
		else if (opcao == 2){
			valorRetirado = removerFim();
			if (valorRetirado != -1){
				printf("Valor removido: %d\n", valorRetirado);
			}
			imprimirVetor();
		}
		else {
			printf("Opcao invalida\n");
		}

		printf("0-Sair, 1-Inserir (push), 2-Remover (pop)\n");
		scanf("%d", &opcao);
	}

	return 0;
}
