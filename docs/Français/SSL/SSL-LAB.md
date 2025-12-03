# **SSL tutorial**

<ins style="font-size: 19px; font-weight: bold;">Utiliser les commandes bash dans Windows 10</ins>

### `Win + R / optionalfeatures.exe / Sous-Système windows pour Linux / Redémarrer le PC / Microsoft store / Installer une distribution linux (ubuntu, fedora, ...) / win + R / cmd /`
````
bash
lsb_release -rb
````
<hr>

<ins style="font-size: 19px; font-weight: bold;">Cloner le repo</ins>

### ![clone](/img/clone.png)
### `Puis : `
```
git clone git://git.openssl.org/openssl.git
```
<hr>
<ins style="font-size: 19px; font-weight: bold;">Sur Windows une fois que le repo est cloner, vous devez vous assurer que les fin de lignes soient correctes</ins>

```
cd openssl
git config core.autocrlf false
git config core.eol lf
git checkout .
```
<hr>
<ins style="font-size: 19px; font-weight: bold;">Générer la clef encrypté et/ou signée avec l'algorithme RSA</ins>

#### une clef RSA comporte une clef une `clef privée` (générer des signatures digitales) et/ou une `clef publique` (vérifier des signatures digitales).
```
openssl genrsa -out encrypted_rsa.key 2048
```
<hr>
<ins style="font-size: 19px; font-weight: bold;">Extraire la clef publique</ins>

```
openssl rsa -in encrypted_rsa.key -pubout -out encrypted_rsa_public.key
```
<hr>
<ins style="font-size: 19px; font-weight: bold;">Créer une demande de signature de certificat <br>{.csr = certificate signing request}</ins>

```
openssl req -new -key encrypted_rsa.key -out encrypted_rsa.csr
```
<hr>
<ins style="font-size: 19px; font-weight: bold;">Vérifier la demande de signature de certificat</ins>

#### -in = csr name.
#### -noout = empêche l'output de la version encodée de la clef privée.
```
openssl req -text -in encrypted_rsa.csr -noout -verify
```
<hr>
<ins style="font-size: 19px; font-weight: bold;">Le certificat peut être signé par un `CA` (certificate authority) ou `Autosigné` (Self-signed certificate)</ins>

### Ici le certificat csr est autosigné
```
openssl x509 -in encrypted_rsa.csr -out encrypted_rsa.crt -req -signkey encrypted_rsa.key -days 3650
```
<hr>

<ins style="font-size: 19px; font-weight: bold;">Résultat</ins>
### ![clone](/img/end.png)
<hr>

<ins style="font-size: 25px; font-weight: 700;">Sources</ins>

#### OpenSSL Step By Step Tutorial | How to Generate Keys, Certificates & CSR Using OpenSSL - Tutorials Pedia :
#### https://www.youtube.com/watch?v=wzbf9ldvBjM
#### OpenSSL Git repository :
#### https://www.openssl.org/source/gitrepo.html

#### Enable Windows Subsystem for Linux in Windows 10 :
#### https://www.groovypost.com/howto/install-and-start-bash-in-windows-10-anniversary-update/