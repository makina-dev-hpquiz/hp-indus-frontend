import { Link } from 'src/entities/link';
import { LinksGroup } from 'src/entities/linksGroup';
import { ServerUrlConst } from './serverUrlConst';

export class NavigationConst {
    //icon
    private static readonly iconFolder = 'assets/icon/navigation/';

    private static readonly docsIcon = NavigationConst.iconFolder + 'google-docs.svg';
    private static readonly sheetsIcon = NavigationConst.iconFolder + 'google-sheets.svg';
    private static readonly githubIcon = NavigationConst.iconFolder + 'github.svg';
    private static readonly postresqlIcon = NavigationConst.iconFolder + 'postgresql.svg';
    private static readonly sonarqubeIcon = NavigationConst.iconFolder + 'sonarqube.svg';
    private static readonly tomcatIcon = NavigationConst.iconFolder + 'tomcat.svg';
    private static readonly trelloIcon = NavigationConst.iconFolder + 'trello.svg';

    //Usage quotidien
    private static readonly dailyUseTitle = 'Usage quotidien';
    private static readonly trelloCurrentLot = new Link(
        NavigationConst.trelloIcon,
        'Trello Lot 0',
        'https://trello.com/b/0nxmoKAm/lot-0'
    );
    private static readonly logBook = new Link(
        NavigationConst.docsIcon,
        'Journal de bord',
        'https://docs.google.com/document/d/13rAYX7682Tl2PeBYgLWXr_n-HCTmqKyhS0WNDFKP_Hc/edit?usp=sharing'
    );
    private static readonly chiffrage = new Link(
        NavigationConst.sheetsIcon,
        'Chiffrage',
        'https://docs.google.com/spreadsheets/d/12cPok14pU8tnejYP6GV8gVy76S_Eqh-w1hvSaMXM31Y/edit?usp=sharing'
    );

    // Accès serveur
    private static readonly serverAccesTitle = 'Accès serveur';
    private static readonly backend = new Link(
        NavigationConst.tomcatIcon,
        'hp-indus-backend',
        ServerUrlConst.urlServer
    );
    private static readonly tomcat = new Link(
        NavigationConst.tomcatIcon,
        'Serveur tomcat',
        ServerUrlConst.url + ':' + ServerUrlConst.portTomcat
    );
    private static readonly pgsql = new Link(
        NavigationConst.postresqlIcon,
        'Postgresql',
        ServerUrlConst.url + ':5432'
    );

    // Evolution
    private static readonly evolutionTitle = 'Evolution';
    private static readonly developmentProcess = new Link(
        NavigationConst.docsIcon,
        'Processus de développement',
        'https://docs.google.com/document/d/1Y5w0f3LfTtZYEQzHYtE2eBRtU-W-IcFJMpVJ0ixaSn4/edit?usp=sharing'
    );
    private static readonly evolutionForm = new Link(
        NavigationConst.docsIcon,
        'Fiche dEtudes d\'Evolution',
        'https://docs.google.com/document/d/1iVc_LN0ASTt1PtkVaKnUZQqwUy8vForzlY8nYA-7GKE/edit?usp=sharing'
    );
    private static readonly estimateForm = new Link(
        NavigationConst.sheetsIcon,
        'Estimation chiffrage',
        'https://docs.google.com/spreadsheets/d/10BU8wnGJOA7S5wQ84JIAi1yZnOUvesDFMCqW7oB8dk4/edit?usp=sharing'
    );

    //Developpement
    private static readonly developmentTitle = 'Développement';
    private static readonly sonarqube = new Link(
        NavigationConst.sonarqubeIcon,
        'Sonarqube',
        ServerUrlConst.url + ':9000'
    );
    private static readonly github = new Link(
        NavigationConst.githubIcon,
        'Github',
        'https://github.com/VHauchecorn'
    );
    private static readonly trelloGlobal = new Link(
        NavigationConst.trelloIcon,
        'Trello global',
        'https://trello.com/w/environnementharrypotterquiz/home'
    );

    //Ressources documentaires
    private static readonly resourceTitles = 'Ressources documentaires';
    private static readonly sfdDoc = new Link(
        NavigationConst.docsIcon,
        'Spécifications fonctionnelles détaillées',
        'https://docs.google.com/document/d/1PWQbXQAr6nYlZHapnuzb-IvZHkaL8dhV8KiqI0nae5Y/edit?usp=sharing'
    );
    private static readonly cdcDoc = new Link(
        NavigationConst.docsIcon,
        'Cahier des charges',
        'https://docs.google.com/document/d/1ltLQh4fln5jLzrMJe7gymfBdCJC38CYv4dL5tNIwOeQ/edit?usp=sharing'
    );

    private static readonly roadmap = new Link(
        NavigationConst.docsIcon,
        'Roadmap',
        'https://docs.google.com/document/d/1nxdJMI8h9_iNmjrAvKKnQXeV1GuceJjOrsuhjklycQk/edit?usp=sharing'
    );

    public static getNavigationConsts() {
        return [
            NavigationConst.getDailyUseHeading(),
            NavigationConst.getServerAccessHeading(),
            NavigationConst.getEvolutionHeading(),
            NavigationConst.getDevelopmentHeading(),
            NavigationConst.getDocumentaryResources()
        ];
    }

    private static getDailyUseHeading() {
        return new LinksGroup(NavigationConst.dailyUseTitle,
            [NavigationConst.trelloCurrentLot, NavigationConst.logBook, NavigationConst.chiffrage]);
    }

    private static getServerAccessHeading() {
        return new LinksGroup(NavigationConst.serverAccesTitle, [
            NavigationConst.backend, NavigationConst.tomcat, NavigationConst.pgsql
        ]);
    }

    private static getEvolutionHeading() {
        return new LinksGroup(NavigationConst.evolutionTitle, [
            NavigationConst.developmentProcess, NavigationConst.evolutionForm, NavigationConst.estimateForm, NavigationConst.chiffrage
        ]);
    }

    private static getDevelopmentHeading() {
        return new LinksGroup(NavigationConst.developmentTitle, [
            NavigationConst.sonarqube, NavigationConst.github, NavigationConst.trelloGlobal
        ]);
    }

    private static getDocumentaryResources() {
        return new LinksGroup(NavigationConst.resourceTitles, [
            NavigationConst.sfdDoc, NavigationConst.cdcDoc, NavigationConst.roadmap
        ]);
    }
}
