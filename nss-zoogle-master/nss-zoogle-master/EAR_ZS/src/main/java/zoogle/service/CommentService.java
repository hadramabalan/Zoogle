package zoogle.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import zoogle.dao.CommentDao;
import zoogle.model.Advert;
import zoogle.model.Comment;
import zoogle.model.User;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Objects;
import java.util.zip.DataFormatException;
import zoogle.dao.AdvertDao;
import zoogle.dao.UserDao;

@Service
public class CommentService {
    @PersistenceContext
    private EntityManager em;
    CommentDao commentDao;
    AdvertDao adDao;
    UserDao usrDao;

    @Autowired
    public CommentService(CommentDao commentDao, AdvertDao adverDao, UserDao userDao) {
        this.commentDao = commentDao;
        this.usrDao = userDao;
        this.adDao = adverDao;
    }

    @Transactional
    public void persist(Comment comment) {
        Objects.requireNonNull(comment);
        commentDao.persist(comment);
    }

    @Transactional
    public void delete(Comment comment) {
        Objects.requireNonNull(comment);
        commentDao.remove(comment);
    }

    @Transactional
    public void update(Comment comment) {
        Objects.requireNonNull(comment);
        commentDao.update(comment);
    }

    @Transactional
    public Comment findById(Integer adId) {
        return commentDao.find(adId);
    }

    @Transactional
    public List<Comment> findAllComments() {
        return commentDao.findAll();
    }

    @Transactional
    public List<Comment> findCommentByUser(User user) {
        return commentDao.findCommentByUser(user);
    }
    @Transactional
    public List<Comment> findByCommentsByAdvert(Advert advert) {
        List<Comment> orig = commentDao.findByCommentsByAdvert(advert);
        ArrayList<Comment> ret = new ArrayList<>();
        Comment temp;
        for (Comment c: orig){
            temp = new Comment();
            temp.setId(c.getId());
            temp.setUser(new User(c.getUser()));
            temp.setAdvert(new Advert(c.getAdvert()));
            temp.setText(c.getText());
            temp.setDateCreated(c.getDateCreated());
            ret.add(temp);
        }
        return ret;
    }


    @Transactional
    public void addComment(String comment, User user, Advert advert){
        Comment comment1 = new Comment();
        Advert ad = adDao.find(advert.getId());
        
        comment1.setAdvert(ad);
        comment1.setText(comment);
        comment1.setUser(user);
        comment1.setDateCreated(new Date());
        commentDao.persist(comment1);
    }
    /*@Filip Sváček krome ad comment je potreba i endpoint na get comments*/
}
