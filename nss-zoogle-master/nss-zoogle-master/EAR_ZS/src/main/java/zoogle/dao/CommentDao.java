/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package zoogle.dao;

import org.springframework.stereotype.Repository;
import zoogle.model.Advert;
import zoogle.model.Comment;
import zoogle.model.User;

import java.util.List;

@Repository
public class CommentDao extends BaseDao<Comment>{
    
    public CommentDao() {
        super(Comment.class);
    }

    public List<Comment> findByCommentsByAdvert(Advert ad) {
        return em.createNamedQuery("Comment.findCommentByAdvert", Comment.class)
                .setParameter("advert", ad)
                .getResultList();
    }

    public List<Comment> findCommentByUser(User user) {
        return em.createNamedQuery("Comment.findCommentByUser", Comment.class)
                .setParameter("user", user)
                .getResultList();
    }
}
