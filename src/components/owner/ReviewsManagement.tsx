import { useState } from "react";
import { Star, MessageSquare, ThumbsUp, Flag, Reply, Filter } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface Review {
  id: string;
  customerName: string;
  customerAvatar?: string;
  rating: number;
  date: string;
  service: string;
  comment: string;
  reply?: string;
  isVerified: boolean;
  isReported: boolean;
  likes: number;
}

const mockReviews: Review[] = [
  {
    id: '1',
    customerName: 'Sarah Johnson',
    rating: 5,
    date: '2024-01-15',
    service: 'Hair Cut & Style',
    comment: 'Amazing experience! Sarah was so professional and gave me exactly what I wanted. The salon has a great atmosphere and I felt so relaxed.',
    isVerified: true,
    isReported: false,
    likes: 3
  },
  {
    id: '2',
    customerName: 'Maria Garcia',
    rating: 5,
    date: '2024-01-10',
    service: 'Hair Color',
    comment: 'Love my new hair color! The balayage came out perfect. Will definitely be coming back.',
    reply: 'Thank you so much Maria! We\'re thrilled you love your new look. Can\'t wait to see you again!',
    isVerified: true,
    isReported: false,
    likes: 7
  },
  {
    id: '3',
    customerName: 'Jessica Chen',
    rating: 4,
    date: '2024-01-08',
    service: 'Manicure',
    comment: 'Great manicure, lasted longer than expected. Only minor issue was the wait time, but the quality made up for it.',
    isVerified: true,
    isReported: false,
    likes: 2
  },
  {
    id: '4',
    customerName: 'Anonymous',
    rating: 2,
    date: '2024-01-05',
    service: 'Hair Cut',
    comment: 'Not happy with the service. Hair was cut too short and staff seemed rushed.',
    isVerified: false,
    isReported: true,
    likes: 0
  }
];

export const ReviewsManagement = () => {
  const [reviews, setReviews] = useState<Review[]>(mockReviews);
  const [filterRating, setFilterRating] = useState('all');
  const [replyText, setReplyText] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  const totalReviews = reviews.length;
  const verifiedReviews = reviews.filter(review => review.isVerified).length;

  const filteredReviews = filterRating === 'all' 
    ? reviews 
    : reviews.filter(review => review.rating === parseInt(filterRating));

  const handleReply = (reviewId: string) => {
    setReviews(reviews.map(review => 
      review.id === reviewId 
        ? { ...review, reply: replyText }
        : review
    ));
    setReplyText('');
    setReplyingTo(null);
  };

  const handleReport = (reviewId: string) => {
    setReviews(reviews.map(review => 
      review.id === reviewId 
        ? { ...review, isReported: !review.isReported }
        : review
    ));
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Customer Reviews</CardTitle>
            <CardDescription>Manage and respond to customer feedback</CardDescription>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2">
              <div className="flex">{renderStars(Math.round(averageRating))}</div>
              <span className="font-semibold">{averageRating.toFixed(1)}</span>
            </div>
            <p className="text-sm text-muted-foreground">{totalReviews} reviews</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        
        
        <div className="grid gap-4 md:grid-cols-4 mb-6">
          <div className="text-center p-3 border rounded-lg">
            <div className="text-2xl font-bold text-green-600">{verifiedReviews}</div>
            <p className="text-sm text-muted-foreground">Verified Reviews</p>
          </div>
          <div className="text-center p-3 border rounded-lg">
            <div className="text-2xl font-bold">{reviews.filter(r => r.rating === 5).length}</div>
            <p className="text-sm text-muted-foreground">5-Star Reviews</p>
          </div>
          <div className="text-center p-3 border rounded-lg">
            <div className="text-2xl font-bold">{reviews.filter(r => r.reply).length}</div>
            <p className="text-sm text-muted-foreground">Replied To</p>
          </div>
          <div className="text-center p-3 border rounded-lg">
            <div className="text-2xl font-bold text-red-600">{reviews.filter(r => r.isReported).length}</div>
            <p className="text-sm text-muted-foreground">Reported</p>
          </div>
        </div>

        
        <div className="flex items-center gap-4 mb-6">
          <Filter className="h-4 w-4" />
          <Select value={filterRating} onValueChange={setFilterRating}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter by rating" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Ratings</SelectItem>
              <SelectItem value="5">5 Stars</SelectItem>
              <SelectItem value="4">4 Stars</SelectItem>
              <SelectItem value="3">3 Stars</SelectItem>
              <SelectItem value="2">2 Stars</SelectItem>
              <SelectItem value="1">1 Star</SelectItem>
            </SelectContent>
          </Select>
        </div>

        
        <div className="space-y-4">
          {filteredReviews.map((review) => (
            <div key={review.id} className="border rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>{review.customerName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{review.customerName}</p>
                      {review.isVerified && (
                        <Badge variant="secondary" className="text-xs">Verified</Badge>
                      )}
                      {review.isReported && (
                        <Badge variant="destructive" className="text-xs">Reported</Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex">{renderStars(review.rating)}</div>
                      <span className="text-sm text-muted-foreground">
                        {new Date(review.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                <Badge variant="outline">{review.service}</Badge>
              </div>

              <p className="text-sm mb-3">{review.comment}</p>

              {review.reply && (
                <div className="bg-muted p-3 rounded-lg mb-3">
                  <p className="text-sm font-medium mb-1">Your Reply:</p>
                  <p className="text-sm">{review.reply}</p>
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm">
                    <ThumbsUp className="h-3 w-3 mr-1" />
                    {review.likes}
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleReport(review.id)}
                  >
                    <Flag className="h-3 w-3 mr-1" />
                    {review.isReported ? 'Unreport' : 'Report'}
                  </Button>
                </div>

                {!review.reply && (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Reply className="h-3 w-3 mr-1" />
                        Reply
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Reply to Review</DialogTitle>
                        <DialogDescription>
                          Respond to {review.customerName}'s review
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="bg-muted p-3 rounded-lg">
                          <div className="flex">{renderStars(review.rating)}</div>
                          <p className="text-sm mt-2">"{review.comment}"</p>
                        </div>
                        <Textarea
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          placeholder="Write your reply..."
                          rows={4}
                        />
                        <Button 
                          onClick={() => handleReply(review.id)}
                          disabled={!replyText.trim()}
                          className="w-full"
                        >
                          Send Reply
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
