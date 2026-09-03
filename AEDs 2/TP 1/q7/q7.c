#include <stdio.h>

int  substring (char string [], int vetor [], int tamanho){
	
	int contador = 0, n = 0, = 0;

	for (int i = 0; i < tamanho; i++){
		
		int ascii = (string[i] - 'a'); // transforma letra no respectivo número da tabela ascii

		if (vetor [ascii]){ // verifica se a letra ta no alfabeto

		if (contador == 0){ // verifica se é a primeira letra da substring
			n = i; // ínicio da substring
		}
			
		contador++; // proxima letra
		vetor [ascii]--; // muda a letra pra false no vetor alfabeto				

		if (contador > maior){ // verifica se a sustring atual é maior do que a maior
			maior = contador; // caso seja, string atual torna-se a maior
		}
				
		} else {	
			contador = 0; // caso a letra se repita reinicia o contador
			i = n; //e inicia o loop a partir dessa letra repitida
			
			if ( maior > tamanho - i){ //verifica se ainda existem letras suficientes para criar uma substring mais longa
				i = tamanho; // caso nao tenha, termina o for
			}

			for (int i = 0; i < 26; i++){ // for preenchendo o alfabeto todo como true
			vetor[i] = 1;                
		       	}
		}	
	}	
	return maior;
}
int main (){

	char string [100];
	int alfabeto [26];
	int resultado = 0, tamanho = 0;
	
	fgets (string, 99, stdin);
	
	while (!(string[0] == 'F' && string[1] == 'I' && string[2] == 'M' && string [3] == '\n')){ //verifica se está escrito a palavra FIM na string, caso for, cancela o loop
	
		tam = 0;

		while (string [tam] != '\n'){ //verificar o tamanho da string
			tam++;
		}

		for (int i = 0; i < 26; i++){ // preenchendo o vetor com as letras do alfabeto
			alfabeto[i] = 1;
		}

      	resposta = substring (string, alfabeto, tamanho);
	printf ("%d\n", resposta);
	fgets (string, 99, stdin);
	}		
}

