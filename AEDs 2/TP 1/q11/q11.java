public class Inversao {

    public static String inversao(String texto, int i) { // funcao que faz a inversao da string
        if (i < 0) {
            return "";
        }
        return texto.charAt(i) + inversao(texto, i - 1);
    }

    public static boolean Fim(String palavra, String fim) { // função que verifica se é a palavra FIM
        if (palavra.length() == fim.length()) { // verifica se a string tem 3 letras
            for (int i = 0; i < fim.length(); i++) {
                if (palavra.charAt(i) != fim.charAt(i)) {
                    return true; // caso seja diferente, o loop continua
                }
            }
            return false; // a palavra é FIM, retorna falso para parar o loop
        }
        return true; // a palavra não é FIM, retorna verdadeiro para continuar o loop
    }

    public static void main(String[] args) {
        java.util.Scanner entrada = new java.util.Scanner(System.in);
        
        String texto = entrada.nextLine();
        
        while (Fim(texto, "FIM")) { // chama a funcao que verifica se a palavra é FIM
            System.out.println(inversao(texto, texto.length() - 1)); //chama a funcao que faz a inversao
            texto = entrada.nextLine();
       		}
	}
}
