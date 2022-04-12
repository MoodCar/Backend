const sql = require('./db.js');

const Diary = function(diary){
    this.user_id = diary.user_id;
    this.diary_title = diary.diary_title;
    this.diary_content = diary.diary_content;
}

