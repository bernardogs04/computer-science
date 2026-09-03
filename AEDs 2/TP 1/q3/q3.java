import java.util.Scanner;

public class Is {

    public static boolean Vogal(String s, int n) { // metodo que verifica se tem apenas vogais
        for (int i = 0; i < n; i++) {
            char c = s.charAt(i);
            if (c != 'a' && c != 'e' && c != 'i' && c != 'o' && c != 'u' &&
                c != 'A' && c != 'E' && c != 'I' && c != 'O' && c != 'U') {
                return false;
            }
        }
        return true;
    }

    public static boolean Consoante(String s, int n) { // metodo que verifica se tem apenas consoantes
        for (int i = 0; i < n; i++) {
            char c = s.charAt(i);
            if (!((c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z'))) {
                return false;
            }
            if (c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u' ||
                c == 'A' || c == 'E' || c == 'I' || c == 'O' || c == 'U') {
                return false;
            }
        }
        return true;
    }

    public static boolean NumeroInteiro(String s, int n) { // metodo que verifica se é numero inteiro
     	    for (int i = 0; i < n; i++) {
            char c = s.charAt(i);
            if (c < '0' || c > '9') {
                return false;
            }
        }
        return true;
    }

    public static boolean NumeroReal(String s, int n) { // metodo que verifica se é numero real
        int separadores = 0;

        for (int i = 0; i < n; i++) {
            char c = s.charAt(i);

            if (c == '.' || c == ',') {
                separadores++;
                if (separadores > 1) {
                    return false;
                }
            } else if (c < '0' || c > '9') {
                return false;
            }
        }
        return true;
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
        Scanner sc = new Scanner(System.in);
        String entrada = sc.nextLine();

        while (Fim(entrada, "FIM")){ // chama a funcao que verifica se a palavra é FIM
            int n = entrada.length(); // verifica o tamanho da entrada
            String x1, x2, x3, x4;

            if (Vogal(entrada, n)) { // chama a funcao que verifica se tem vogal
                x1 = "SIM";
            } else {
                x1 = "NAO";
            }

            if (Consoante(entrada, n)) { // chama a funcao que verifica se tem consoante
                x2 = "SIM";
            } else {
                x2 = "NAO";
            }

            if (NumeroInteiro(entrada, n)) { // chama a funcao que verifica se tem numero inteiro
                x3 = "SIM";
            } else {
                x3 = "NAO";
            }

            if (NumeroReal(entrada, n)) { // chama a funcao que verifica se tem numero real
                x4 = "SIM";
            } else {
                x4 = "NAO";
            }

            System.out.println(x1 + " " + x2 + " " + x3 + " " + x4); // printa as saidas

            entrada = sc.nextLine();
        }
    }
}
