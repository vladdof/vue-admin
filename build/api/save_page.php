<?php

    session_start();
    if ($_SESSION['auth'] != true) {
        header('HTTP/1.0 403 Forbidden');
        die;
    }

    $_POST = json_decode(file_get_contents('php://input'), true);

    $file = $_POST['pageName'];
    $new_html = $_POST['html'];

    if (!is_dir('../backups/')) {
        mkdir('../backups/');
    }

    $backups = json_decode(file_get_contents('../backups/backups.json'));
    if (!is_array($backups)) {
        $backups = [];
    }

    if ($new_html && $file) {
        $backup_file_name =  uniqid() . '.html';

        copy('../../' . $file, '../backups/' . $backup_file_name);
        array_push($backups, [
            'page' => $file,
            'file' => $backup_file_name,
            'time' => date('H:i:s d.m.y')
        ]);
        file_put_contents('../backups/backups.json', json_encode($backups));

        file_put_contents('../../' . $file, $new_html);
    } else {
        header('HTTP/1.0 400 Bad Request');
    }
