const { admin, db } = require("../../utils/admin")

class WikiManagmentUTILS {
  static async _check_comment_exists(commentId, articleId) {
    return db
      .collection("WIKI")
      .doc(articleId)
      .collection("ARTICLE_COMMENTS")
      .where("articleId", "==", articleId)
      .where("id", "==", commentId)
      .where("isExist", "==", true)
      .get()
      .then((snap) => {
        if (snap.size < 1) throw new Error("no-comment-exists")
        return snap.docs[0].data()
      })
      .catch((err) => {
        throw err
      })
  }

  static async _check_article_exists(articleId) {
    return db
      .collection("WIKI")
      .where("id", "==", articleId)
      .where("isExist", "==", true)
      .get()
      .then((snap) => {
        if (snap.size < 1) throw new Error("no-article-exists")
        return snap.docs[0].data()
      })
      .catch((err) => {
        throw err
      })
  }

  static async _check_article_doesnot_exist(articleId) {
    return db
      .collection("WIKI")
      .where("id", "==", articleId)
      .where("isExist", "==", false)
      .get()
      .then((snap) => {
        if (snap.size < 1) throw new Error("article-exists")
        return snap.docs[0].data()
      })
      .catch((err) => {
        throw err
      })
  }

  static async _check_valid_category(categoryName) {
    const categoryRef = db.collection("ID_TRACKER").doc("categories")
    let categories
    try {
      const doc = await categoryRef.get()
      categories = doc.data()
      if (doc.exists) {
        let categoryNames = Object.entries(categories.types).map(([key, value]) =>
          value.trim().toLowerCase()
        )
        return !categoryNames.includes(categoryName.trim().toLowerCase())
      }
      return true
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  static _acceptable_inputs_comment(inputs) {
    const keys = ["content"]

    return Object.keys(inputs).reduce((initial, key) => {
      if (!keys.includes(key)) delete initial[key]
      return initial
    }, inputs)
  }

  static _acceptable_inputs_article(inputs) {
    const keys = ["title", "content", "attachments"]

    return Object.keys(inputs).reduce((initial, key) => {
      if (!keys.includes(key)) delete initial[key]
      return initial
    }, inputs)
  }

  static _acceptable_inputs_category(inputs) {
    const keys = ["name", "description"]

    return Object.keys(inputs).reduce((initial, key) => {
      if (!keys.includes(key)) delete initial[key]
      return initial
    }, inputs)
  }
}

module.exports = WikiManagmentUTILS
