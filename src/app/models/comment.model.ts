export class Comment {
    private content: String;
    private date: String;
    private votes: Date;
    private post: String;
    private comment: String;
    private user: String;

    constructor(content: String, date: String, votes: Date, post: String, comment: String, user: String) {
        this.content = content;
        this.date = date;
        this.votes = votes;
        this.post = post;
        this.comment = comment;
        this.user = user;
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

    setDate(date: String) {
        this.date = date;
    }

    getVotes() {
        return this.votes;
    }

    setVotes(votes: Date) {
        this.votes = votes;
    }

    getPost() {
        return this.post;
    }

    setPost(post: String) {
        this.post = post;
    }

    getComment() {
        return this.comment;
    }

    setComment(comment: String) {
        this.comment = comment;
    }

    getUser() {
        return this.user;
    }

    setUser(user: String) {
        this.user = user;
    }

}
