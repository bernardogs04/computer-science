#include <stdio.h>

int calculo(int numero){
	int resposta = 0;
	while (numero > 0){ //loop vai rodar até o numero for maior que 0
		resposta += numero % 10; //somatorio que guarda do resto da divisao
		numero = numero/10; //divide o numero por 10, para conseguir captar cada digito do numero
	}
	return resposta;
}

int main(){
	int numero;
	int resposta;

	for (int i = 0; i < 50; i++){ //pub.in tem 50 numeros, logo for até 50
		scanf ("%d", &numero);
		resposta = calculo (numero); //chamada da funcao que faz o calculo
		printf ("%d\n", resposta);
	}


	return 0;
}
