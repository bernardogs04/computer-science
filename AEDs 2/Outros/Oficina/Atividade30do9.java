import java.util.*;

	class Calula{
	
	public int elemento;
	public Celula sup, inf, prox, ant;

	Celula(){
		this.elemento = x;
		sup = null;
		inf = null;
		dir = null;
		esq = null;
		}
	}	

	public class Matriz(int linha, int coluna){
		this.linha = linha;
		this.coluna = coluna;
		int inicio = new Celula();
		int fim;
		int contador = 0;

		Celula i = inicio;
		for (int j = 1; j < coluna; j++){
			i.dir = new Celula(contador++);
			i.dir.esq = i;
			i = i.dir;
		}

		i = inicio;
		for (int l = 1; l < linha; l++){
			i.inf = new Celula(contador++);
			i.inf.sup = i;
			Celula atual = i.inf;
			Celula acima = i;
			for (int c = 1; c < coluna; c++){
				atual.dir = new Celula(contador++);
				atual.dir.esq = atual;

				acima = acima.dir;
				acima.inf = atual.dir;
				atual.dir.sup = acima;

				atual = atual.dir;
			}
			i = i.inf;
		}
	}

	public class Caracol(Matriz; int linha; int coluna){
		Celula tmp1 = inicio;

		for (int i = 0; i < linha; i++){
			if (i % 2 == 0){
				for (int j = coluna; j > 0; j--){
					System.out.println (tmp1.elemento);
					tmp1 = tmp1.esq;
				}
				tmp1 = tm1.inf;
			}
			else{
				for (int j = 0; j < coluna; j++){
					System.out.println (tmp1.elemento);
					tmp1 = tmp1.dir;
				}
				tmp1 = tmp1.inf;
			}
			
		}
	}

	

	public class Invertido(Matriz, int linha, int coluna){
		Celula tmp1 = inicio;
		Calula tmp2 = inicio;
		int contadorL = 0;
		int contadorC = 0;

		while (tmp2.prox != null){
			tmp2.prox;
			contadorL++;
		}

		while (tmp1.inf != null){
			tmp1.inf;
			contadorC++;
		}
		tmp1 = tmp2;

		for (int i = 0; i < contadorL; i++){
			for (int j = 0; j < contadorC; j++){
				System.out.println(tmp1.elemento);
				tmp1 = tmp1.ant;
			}
			tmp2 = tmp2.inf;
			tmp1 = tmp2;
		}



	}

class Atividade30do9{
	public static void main(String[] args){

	}
}
