<?php

use Illuminate\Support\Facades\Route;

Route::get('/{any}', 'Controller@index')->where('any', '.*');
