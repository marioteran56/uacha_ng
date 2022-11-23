export class Comment {
    private title: String;
    private description: String;
    private topics: String[];

    constructor(title: String, description: String, topics: String[]) {
        this.title = title;
        this.description = description;
        this.topics = topics;
    }

    getTitle() {
        return this.title;
    }

    setTitle(title: String) {
        this.title = title;
    }

    getDescription() {
        return this.description;
    }

    setDescription(description: String) {
        this.description = description;
    }

    getTopics() {
        return this.topics;
    }

    setTopics(topics: String[]) {
        this.topics = topics;
    }

}
