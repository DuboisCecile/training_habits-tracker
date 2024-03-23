# Exercice Fastify/Asynchrone/Tailwind

Il s'agit juste d'une petite application qui m'a permis :

-   D'utiliser Fastify pour aller manipuler des données stockées dans un json (pour éviter de devoir construire une BDD juste pour cet exercice) en gérant le côté asynchrone
-   De jouer un peu avec Tailwind, cela faisait longtemps que je n'y avais pas touché !
-   D'implémenter un dark mode simple (grâce à Tailwind)

Je n'ai pas cherché à gérer le responsive, ce n'était pas le but de cet exercice.

J'ai mis le front et le back dans le même repo, pour une question de simplicité.

**Attention !**
Si on utilise des classes Tailwind de façon dynamique (en construisant les éléments via le js), il faut bien veiller à mettre un tableau avec toutes les classes Tailwind utilisées dans ce js dans le fichier tailwind.config.js, dans la propriété safelist (sauf si elles ont déjà été utilisées dans le html).

Car Tailwind détecte toutes les strings qui pourraient ressembler à "ses" classes dans les fichiers sources. Or, lorsqu'il le fait, les éléments n'ont pas encoroe été construits par js. Les classes seront donc bien visibles dans le DOM, mais elles ne seront pas interprétées par Tailwind, qui ne les aura pas détectées en amont. Ces styles ne s'appliqueront donc pas.

Il faut aussi penser à mettre la propriété darkMode dans le tailwindConfig.js pour pouvoir implémenter le dark mode.
