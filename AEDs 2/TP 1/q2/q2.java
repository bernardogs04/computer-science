import java.util.Scanner;
import java.util.Random;

public class Aleatoria{
	
	public static String substituir (char letra1, char letra2, String palavra){
		String resultado = ""; // deixando a string vazia
		int n = palavra.length(); // verificando o tamanho da palavra

		for (int i = 0; i < n; i++){ // for rodando até o final da string
		
			if (palavra.charAt(i) == letra1){ // verifica se a letra da string é igual a letra a ser mudada
				resultado += letra2; // caso seja, é alterada pela letra gerada
			} 
			else{
				resultado += palavra.charAt(i); // caso nao seja, adiciona a letra na string
			}			
		
		} 
		return resultado;
	}

         public static boolean Fim(String palavra, String fim){ // funcao que verifica se é a palavra FIM
              	if (leitura.length() == fim.length()){ // verifica se a string tem 3 letras

               	for ( int i = 0; i < 3; i++ ){
                	if (leitura.charAt(i) != fim.charAt(i)){ // compara um caracterie por vez
                        return true;    // caso seja diferente, o loop continua
                        }
                 }
  
                 return false; // a palavra é FIM, retorna falso para parar o loop    
                 }
    
                 return true; // a palavra nao é FIM, retorna verdadeiro para continuar o loop
    
     	}

	    public static void main (String[] args){

	   	 Scanner scan = new Scanner (System.in);
	    
	   	 Random gerador = new Random (); // gerador de números aleatórios
	   	 gerador.setSeed(4); // seed definida

		 String palavra = scan.nextLine();

		while (Fim(palavra, "FIM")){ // chama a funcao que compara se a palavra é FIM
			
	  		char letra1 = (char) ( 'a' + ( Math.abs (gerador.nextInt()) % 26 )); // letra aleatoria que vai ser mudada
			char letra2 = (char) ( 'a' + ( Math.abs (gerador.nextInt()) % 26 )); // letra aleatoria que a letra vai se tornar
	    		
	   		System.out.println (substituir (letra1, letra2, palavra));  // chama a funcao que vai fazer a substituicao e printa
			palavra = scan.nextLine(); // nova leitura de string
		 }	    
	    }
}

