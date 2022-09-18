# **Système de paiement sécurisé pour des services**

## L'objectif est de mettre à disposition les fonctionnalités du Smart Contract à n'importe qui.

#

### Les fonctionnalités du Smart Contract sont les suivantes :

- **Création d'une commande** par un client avec un montant qui va être gelé sur le contrat, une deadline (les éléments en général présent sur un devis) et l'addresse du wallet du prestataire. (1% du montant de la commande est prélevé par le contrat pour les frais de transaction et sont attribués au créateur du contrat qui peut les récupérer à tout moment).

- **Confirmation de la commande** par le prestataire et le client (si les deux confirment, le prestataire peut retirer les sous).

- **Annulation de confirmation** par le prestataire et le client (si ils souhaitent revenir sur leur décision).

- **Annulation de la commande** par le client et le prestataire s'ils sont d'accord pour annuler la commande (si les deux annulent, le client peut retirer les sous).

- **Retrait des sous** par le prestataire (si le client et le prestataire ont confirmés la commande et que la deadline est dépassée).

- **Retrait des sous** par le client (si le client et le prestataire ont annulés la commande et que la deadline est dépassée).

- **Retrait du montant total attribué au créateur du contrat** par le créateur du contrat. (Il peut retirer uniquement la somme des pourcentages prélevés par contrat, si des commandes sont en cours il ne peut pas récupérer le montant de celles-ci).

- **Consultation des commandes** par le client et le prestataire, ils peuvent uniquement consulter les commandes auxquels ils ont participés.