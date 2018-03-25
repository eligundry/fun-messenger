#!/bin/bash

/usr/local/bin/gunicorn fun_messenger.entrypoints.web:app
