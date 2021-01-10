<?php
    $name_file = '../../' . $_POST['name'] . '.html';

    if (file_exists($name_file)) {
        echo 'Файл $name_file существует';
        unlink($name_file);
    } else {
        echo 'Файл $name_file не существует';
    }
