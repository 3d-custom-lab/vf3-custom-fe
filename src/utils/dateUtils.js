export const formatDate = (dateString, format = 'short') => {
  if (!dateString) return 'N/A';
  
  try {
    const date = new Date(dateString);
    
    if (isNaN(date.getTime())) {
      return 'Invalid Date';
    }
    
    switch (format) {
      case 'short':
        // Format: 24/11/2025
        return date.toLocaleDateString('vi-VN');
        
      case 'long':
        // Format: 24 Tháng 11, 2025
        return date.toLocaleDateString('vi-VN', {
          day: '2-digit',
          month: 'long',
          year: 'numeric'
        });
        
      case 'time':
        // Format: 24/11/2025 15:58
        return date.toLocaleString('vi-VN', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        });
        
      case 'full':
        // Format: Thứ Sáu, 24 Tháng 11, 2025 lúc 15:58
        return date.toLocaleString('vi-VN', {
          weekday: 'long',
          day: '2-digit',
          month: 'long',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        });
        
      default:
        return date.toLocaleDateString('vi-VN');
    }
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'N/A';
  }
};

export const getRelativeTime = (dateString) => {
  if (!dateString) return 'N/A';
  
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffSecs = Math.floor(diffMs / 1000);
    const diffMins = Math.floor(diffSecs / 60);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffSecs < 60) return 'Vừa xong';
    if (diffMins < 60) return `${diffMins} phút trước`;
    if (diffHours < 24) return `${diffHours} giờ trước`;
    if (diffDays < 7) return `${diffDays} ngày trước`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} tuần trước`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} tháng trước`;
    return `${Math.floor(diffDays / 365)} năm trước`;
  } catch (error) {
    console.error('Error getting relative time:', error);
    return 'N/A';
  }
};
