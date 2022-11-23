export class Post {
    private title: String;
    private content: String;
    private date: Date;
    private votes: number;
    private tags: String[];
    private multimedia: String;
    private category: String;
    private user: String;

    constructor(title: String, content: String, date: Date, votes: number, tags: String[], multimedia: String, category: String, user: String) {
        this.title = title;
        this.content = content;
        this.date = date;
        this.votes = votes;
        this.tags = tags;
        this.multimedia = multimedia;
        this.category = category;
        this.user = user;
    }

    getTitle() {
        return this.title;
    }

    setTitle(title: String) {
        this.title = title;
    }

    getContent() {
        return this.content;
    }

    setContent(content: String) {
        this.content = content;
    }

    getDate() {
        return this.date;
    }

    setDate(date: Date) {
        this.date = date;
    }

    getTags() {
        return this.tags;
    }

    setTags(tags: String[]) {
        this.tags = tags;
    }

    getVotes() {
        return this.votes;
    }

    setVotes(votes: number) {
        this.votes = votes;
    }

    getMultimedia() {
        return this.multimedia;
    }

    setMultimedia(multimedia: String) {
        this.multimedia = multimedia;
    }

    getCategory() {
        return this.category;
    }

    setCategory(category: String) {
        this.category = category;
    }

    getUser() {
        return this.user;
    }

    setUser(user: String) {
        this.user = user;
    }

}
