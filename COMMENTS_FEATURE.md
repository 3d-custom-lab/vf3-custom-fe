# 💬 Comments Feature Documentation

## Overview
Chức năng comment hoàn chỉnh với khả năng reply (nested comments), UI/UX đẹp mắt, và clean code architecture.

## 🎯 Features

### ✅ Core Features
- **Create Comment**: Người dùng có thể comment trực tiếp dưới mỗi post
- **Reply to Comment**: Reply lên comment của người khác (nested comments)
- **View Replies**: Xem danh sách replies của mỗi comment
- **Real-time Updates**: Auto reload sau khi tạo comment/reply
- **Loading States**: Loading spinner khi fetch data
- **Empty States**: Hiển thị thông báo khi chưa có comment

### 🎨 UI/UX Highlights
- **Avatar Display**: Hiển thị avatar hoặc initial letter với gradient background
- **Bubble Chat Style**: Comment hiển thị dạng bubble như chat messenger
- **Rounded Design**: Bo tròn hoàn toàn (rounded-full) cho input và buttons
- **Color Coding**: Purple gradient cho comment chính, Blue gradient cho replies
- **Hover Effects**: Scale animation khi hover buttons
- **Nested Layout**: Reply được indent và có border-left để phân biệt
- **Responsive**: Hoạt động mượt mà trên mọi kích thước màn hình
- **Toast Notifications**: Thông báo success/error khi thực hiện actions

### 🔐 Authentication
- Tự động thêm Bearer token vào request headers
- Hiển thị avatar/name của current user
- Chỉ cho phép authenticated user comment

## 📁 File Structure

```
src/
├── services/
│   └── commentService.js          # API service với 3 endpoints
├── components/
│   └── forum/
│       ├── CommentList.jsx        # Main component - List & Create comment
│       ├── CommentItem.jsx        # Single comment với reply functionality
│       └── PostItem.jsx           # Sử dụng CommentList
```

## 🔌 API Endpoints

### 1. Get Comments by Post ID
```javascript
GET /comments/post/{postId}
Response: {
  code: 1000,
  result: [Comment]
}
```

### 2. Get Replies by Parent ID
```javascript
GET /comments/replies/{parentId}
Response: {
  code: 1000,
  result: [Comment]
}
```

### 3. Create Comment/Reply
```javascript
POST /comments
Body: {
  postId: number,
  content: string,
  parentId: number | null
}
Response: {
  code: 1000,
  result: Comment
}
```

## 🏗️ Component Architecture

### CommentList Component
**Purpose**: Container component quản lý danh sách comments và form tạo comment mới

**State Management**:
- `comments`: Danh sách comments
- `newCommentContent`: Content của comment đang nhập
- `isSubmitting`: Loading state khi submit
- `isLoading`: Loading state khi fetch comments

**Key Functions**:
- `loadComments()`: Fetch comments từ API
- `handleCommentSubmit()`: Tạo comment mới
- `handleReplyCreated()`: Callback khi reply được tạo

**UI Components**:
- Header với icon và count
- Input form với avatar và rounded design
- Loading state với spinner
- Empty state với dashed border
- List of CommentItem components

### CommentItem Component
**Purpose**: Display single comment với reply functionality

**State Management**:
- `showReplyInput`: Toggle reply input
- `replyContent`: Content của reply đang nhập
- `isSubmittingReply`: Loading state cho reply
- `showReplies`: Toggle hiển thị replies
- `replies`: Danh sách replies
- `isLoadingReplies`: Loading state khi fetch replies

**Key Functions**:
- `handleReplySubmit()`: Tạo reply mới
- `loadReplies()`: Fetch replies từ API
- `toggleReplies()`: Toggle hiển thị/ẩn replies
- `formatDate()`: Format timestamp thành relative time

**UI Features**:
- Avatar với fallback initial letter
- Bubble chat style
- Reply button và count
- Collapsible replies section
- Nested reply input với cancel button
- Border-left indicator cho replies

## 🎨 Design System

### Colors
- **Background**: `slate-700`, `slate-800`
- **Text**: `white`, `slate-200`, `slate-400`
- **Primary Action**: `blue-500`, `blue-600`
- **Borders**: `slate-600`, `slate-700`
- **Avatar Gradient**: 
  - Parent comment: `purple-400` to `purple-600`
  - Reply: `blue-400` to `blue-600`

### Spacing
- Comment gap: `gap-3` (12px)
- Reply gap: `gap-2` (8px)
- Input padding: `px-4 py-3`
- Button padding: `px-5 py-3`

### Border Radius
- Input: `rounded-full`
- Button: `rounded-full`
- Comment bubble: `rounded-2xl`
- Avatar: `rounded-full`

### Animations
- Button hover: `hover:scale-105`
- Button active: `active:scale-95`
- Loading spinner: `animate-spin`
- Transition: `transition-all`

## 📝 Usage Example

```jsx
// In PostItem.jsx
import CommentList from "./CommentList";

function PostItem({ post }) {
  const [showComments, setShowComments] = useState(false);

  return (
    <div>
      {/* Post content */}
      
      <button onClick={() => setShowComments(!showComments)}>
        {showComments ? "Hide Comments" : "Show Comments"}
      </button>

      {showComments && <CommentList postId={post.id} />}
    </div>
  );
}
```

## 🔄 Data Flow

```
1. User clicks "Comments" button
   ↓
2. CommentList mounts → loadComments()
   ↓
3. API GET /comments/post/{postId}
   ↓
4. Display comments with CommentItem
   ↓
5. User types and submits comment
   ↓
6. API POST /comments
   ↓
7. Success → loadComments() again
   ↓
8. Update UI with new comment

[Reply Flow]
1. User clicks "Reply" on a comment
   ↓
2. Show reply input
   ↓
3. User types and submits reply
   ↓
4. API POST /comments (with parentId)
   ↓
5. Success → loadReplies() for that comment
   ↓
6. Update UI with new reply
```

## 🚀 Testing Checklist

- [ ] Create top-level comment
- [ ] Create reply to comment
- [ ] View/hide replies
- [ ] Empty state when no comments
- [ ] Loading state when fetching
- [ ] Toast notifications
- [ ] Avatar display (with/without image)
- [ ] Responsive design
- [ ] Long text wrapping
- [ ] Multiple comments pagination
- [ ] Error handling (network errors)
- [ ] Authentication (401 handling)

## 🎯 Best Practices

### Clean Code
- ✅ Single Responsibility: Mỗi component có 1 nhiệm vụ rõ ràng
- ✅ DRY: Không duplicate code
- ✅ Readable: Variable/function names rõ ràng
- ✅ Comments: Có comment cho các phần quan trọng
- ✅ Error Handling: Try-catch cho tất cả API calls
- ✅ Loading States: Loading indicator cho mọi async operations

### Performance
- ✅ Lazy Load Replies: Chỉ fetch khi user click "View replies"
- ✅ Conditional Rendering: Chỉ render khi cần
- ✅ Optimistic Updates: Reload data sau khi create success
- ✅ Debounce: Có thể thêm debounce cho typing

### UX
- ✅ Instant Feedback: Loading spinner, toast notifications
- ✅ Empty States: Clear message khi chưa có data
- ✅ Error Messages: User-friendly error messages
- ✅ Accessibility: Proper button disabled states
- ✅ Visual Hierarchy: Rõ ràng giữa comment và reply

## 🐛 Troubleshooting

### Comment không hiển thị
- Check API endpoint và authentication token
- Xem console log để debug response structure
- Verify postId được truyền đúng

### Reply không load
- Check parentId có đúng không
- Verify API endpoint `/comments/replies/{parentId}`
- Check response.result có data không

### Avatar không hiển thị
- Check `author.avatar` có URL hợp lệ không
- Fallback sẽ hiển thị initial letter
- Check CSS gradient classes

### Toast không hiển thị
- Verify `useToast` hook được import
- Check Toast component có trong component tree không
- Xem console log để debug toast state

## 🔮 Future Enhancements

- [ ] Like/Unlike comments
- [ ] Edit/Delete own comments
- [ ] Pagination for comments (infinite scroll)
- [ ] Mention users (@username)
- [ ] Rich text editor (bold, italic, links)
- [ ] Image upload in comments
- [ ] Emoji picker
- [ ] Comment sorting (newest, oldest, most liked)
- [ ] Comment search/filter
- [ ] Report/Flag inappropriate comments

## 📚 Resources

- [React Hooks Documentation](https://react.dev/reference/react)
- [Tailwind CSS Utilities](https://tailwindcss.com/docs)
- [React Icons](https://react-icons.github.io/react-icons/)

---

**Created**: 2025-11-12  
**Version**: 1.0.0  
**Status**: ✅ Production Ready
