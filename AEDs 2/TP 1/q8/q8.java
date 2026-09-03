   import java.util.Scanner;

public class Senha {

    public static boolean validarSenha(String senha) {
        int tamanho = senha.length(); // verifica o tamanho da senha

        if (tamanho < 8) {
            return false; // caso o tamanho da senha seja menor que 8, retorna falso
        }

        boolean temMaiuscula = false; // declara todas as variaveis como falsas inicialmente
        boolean temMinuscula = false;
        boolean temNumero = false;
        boolean temEspecial = false;

        for (int i = 0; i < tamanho; i++) {
            char c = senha.charAt(i);

            if (c >= 'A' && c <= 'Z') {
                temMaiuscula = true; // caso tenha letra maiuscula retorna true
            } else if (c >= 'a' && c <= 'z') {
                temMinuscula = true; // caso tenha letra minuscula retorna true
            } else if (c >= '0' && c <= '9') {
                temNumero = true; // caso tenha numero retorna true
            } else {
                temEspecial = true; // caso tenha caracteres especiais returna true
            }
        }

        return temMaiuscula && temMinuscula && temNumero && temEspecial;
    }

    public static boolean Fim(String palavra, String fim){ // funçao que verifica se é a palavra FIM
        if (palavra.length() == fim.length()){ // verifica se a string tem 3 letras
            for (int i = 0; i < fim.length(); i++) {
                if (palavra.charAt(i) != fim.charAt(i)) {
                    return true; // caso seja diferente, o loop continua
                }
            }
            return false; // a palavra é FIM, retorna falso para parar o loop
        }
        return true; // a palavra nao é FIM, retorna verdadeiro para continuar o loop
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String senha = sc.nextLine();

        while (Fim(senha, "FIM")) { // chama a função que verifica se a palavra é FIM
            if (validarSenha(senha)) { // chama a funcao que faz a validação da senha
                System.out.println("SIM");
            } else {
                System.out.println("NÃO");
            }
            senha = sc.nextLine();
        }
    }
}
