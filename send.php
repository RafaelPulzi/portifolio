<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $name = htmlspecialchars($_POST["name"]);
    $email = htmlspecialchars($_POST["email"]);
    $message = htmlspecialchars($_POST["message"]);

    $mail = new PHPMailer(true);

    try {

        // CONFIGURAÇÃO SMTP GMAIL
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'SEUEMAIL@gmail.com'; // seu gmail
        $mail->Password   = 'SUA_APP_PASSWORD';    // senha de app gerada
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = 587;

        // REMETENTE
        $mail->setFrom('SEUEMAIL@gmail.com', 'Portfólio Rafael');

        // DESTINO
        $mail->addAddress('SEUEMAIL@gmail.com');

        // RESPOSTA
        $mail->addReplyTo($email, $name);

        // CONTEÚDO
        $mail->isHTML(true);
        $mail->Subject = 'Novo contato do portfólio';
        $mail->Body    = "
            <strong>Nome:</strong> $name <br>
            <strong>Email:</strong> $email <br><br>
            <strong>Mensagem:</strong><br>
            $message
        ";

        $mail->send();

        echo "<script>alert('Mensagem enviada com sucesso!'); window.location.href='index.html';</script>";

    } catch (Exception $e) {
        echo "<script>alert('Erro ao enviar: {$mail->ErrorInfo}'); window.location.href='index.html';</script>";
    }
}