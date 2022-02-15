
package zoogle.model;

import java.util.Date;
import javax.persistence.*;


@Entity
@Table(name = "comments")
@NamedQueries({
        @NamedQuery(name = "Comment.findCommentByAdvert", query = "SELECT u FROM Comment u WHERE u.advert = :advert")
})
public class Comment extends AbstractEntity {
    
    @ManyToOne
    @JoinColumn(name="userId", nullable = false)
    private User user;
    
    @ManyToOne
    @JoinColumn(name="advertId", nullable = false)
    private Advert advert;
    
    @Basic(optional = false)
    @Column(nullable = false)
    private String text;
    
    @Temporal(TemporalType.TIMESTAMP)
    private Date dateCreated;

    public Advert getAdvert() {
        return advert;
    }

    public User getUser() {
        return user;
    }

    public String getText() {
        return text;
    }

    public Date getDateCreated() {
        return dateCreated;
    }

    public void setAdvert(Advert advert) {
        this.advert = advert;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public void setText(String text) {
        this.text = text;
    }

    public void setDateCreated(Date dateCreated) {
        this.dateCreated = dateCreated;
    }
    
    
    
}
