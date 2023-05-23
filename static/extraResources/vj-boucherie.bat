@echo off
title vj-boucherie
taskkill /f /im explorer.exe
%LocalAppData%\Programs\vj-boucherie\vj-boucherie.exe
start explorer.exe