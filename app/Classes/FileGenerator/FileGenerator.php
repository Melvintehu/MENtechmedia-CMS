<?php

namespace App\Classes\FileGenerator;

class FileGenerator {


    public static function createFile(array $file) 
    {
        $generatedFile = fopen($file['directory'] . $file['fileName'], "w");
        fwrite($generatedFile, $file['contents']);
    }

    public static function openFile($filename) 
    {

    }

    public static function generateController($entity) 
    {
        $path_to_file = '../app/Classes/FileGenerator/templates/php/controller.txt' ;
        $file_contents = file_get_contents($path_to_file);
        $contents = str_replace("__className__", $entity->name , $file_contents);        
        
        FileGenerator::createFile([
            'fileName' =>  ucfirst($entity->name) . 'Controller.php', 
            'directory' => '../app/Http/Controllers/api/', 
            'contents' => $contents
        ]);

    }
    
    public static function setContents()
    {

    }



}