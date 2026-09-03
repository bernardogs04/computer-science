public class Ciframento {

    public static boolean Fim(String palavra, String fim){ // funcao que verifica se é a palavra FIM
        if (palavra.length() == fim.length()){ // verifica se a string tem 3 letras

            for ( int i = 0; i < 3; i++ ){
                if (palavra.charAt(i) != fim.charAt(i)){ // compara um caracterie por vez
                    return true;    // caso seja diferente, o loop continua
                }
            }

            return false; // a palavra é FIM, retorna falso para parar o loop
        }

        return true; // a palavra nao é FIM, retorna verdadeiro para continuar o loop
    }

    public static void main(String[] args) {
        java.util.Scanner entrada = new java.util.Scanner(System.in);

        String texto = entrada.nextLine();

        while (Fim(texto, "FIM")) { // chama a funcao que verifica se a palavra é FIM
            String string2 = ""; // criacao de uma segunda string para fazer o ciframento

            for (int i = 0; i < texto.length(); i++) { //preenchendo a segunda string ja cifrada
                char letra1 = texto.charAt(i);
                char letra2 = (char) (letra1 + 3);
                string2 = string2 + letra2;
            }

            String textoCifrado = string2;
            System.out.println(textoCifrado); //printando a string cifrada

            texto = entrada.nextLine(); //lendo novamente a frase para cifrar
        }
   }
}
