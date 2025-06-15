# Data Maturity Assessment Results Page

An elegant, minimalist results page for displaying data maturity assessment scores with interactive radar charts and personalized insights.

## Features

✨ **Interactive Radar Chart** - Visual representation of 5 data maturity categories  
🎯 **Personalized Insights** - Dynamic recommendations based on scores  
📧 **Email Capture** - Lead magnet integration with n8n webhook  
📱 **Responsive Design** - Works beautifully on all devices  
🚀 **Fast Loading** - Optimized for performance  

## Quick Setup

### 1. GitHub Pages Deployment

1. **Create a new GitHub repository** (or use existing one)
2. **Upload these files** to your repository:
   - `index.html`
   - `styles.css` 
   - `script.js`
   - `README.md`

3. **Enable GitHub Pages**:
   - Go to Settings → Pages
   - Source: Deploy from a branch
   - Branch: main/master
   - Folder: / (root)
   - Save

4. **Your page will be live at**: `https://yourusername.github.io/repository-name`

### 2. Testing the Page

Visit your GitHub Pages URL to see the results page with sample data. The page includes:
- Sample scores for all 5 categories
- Interactive radar chart
- Personalized insights
- Email capture form (currently simulated)

### 3. n8n Integration

#### URL Parameters
The page accepts survey results via URL parameters:

```
https://yoursite.com/?scores={"function":3.2,"trust":4.1,"capabilities":2.8,"management":3.7,"leadership":3.5}&email=user@example.com
```

#### Webhook Setup
Update `script.js` line 220 with your n8n webhook URL:
```javascript
const webhookURL = 'https://your-n8n-instance.com/webhook/report-request';
```

## Data Structure

### Score Categories
1. **Data Function** - Established data function
2. **Trusted Data** - Highly trusted data  
3. **Capabilities** - Established capabilities
4. **Management** - Data management maturity
5. **Leadership** - Strong leadership

### Expected Data Format
```json
{
  "scores": {
    "function": 3.2,
    "trust": 4.1, 
    "capabilities": 2.8,
    "management": 3.7,
    "leadership": 3.5
  },
  "email": "optional@example.com",
  "name": "Optional Name"
}
```

## Customization

### Branding
- Update company name in `index.html` (footer)
- Modify colors in `styles.css` (CSS variables at top)
- Replace gradient colors to match your brand

### Content
- Edit insight messages in `script.js` (generateInsights function)
- Customize email form text in `index.html`
- Update chart styling in `script.js` (createRadarChart function)

### Scoring Logic
- Modify score thresholds in `generateInsights()` function
- Adjust chart scale (currently 1-5) in chart options

## n8n Workflow Integration

This page is designed to work with n8n workflows that:

1. **Collect survey responses** (via form/webhook)
2. **Calculate scores** (simple averaging or weighted)
3. **Generate results URL** with score parameters
4. **Redirect user** to this results page
5. **Handle email capture** for follow-up automation

## Next Steps

1. **Deploy to GitHub Pages** ✅
2. **Test with sample data** ✅  
3. **Create n8n survey workflow**
4. **Set up n8n webhook for email capture**
5. **Integrate with MailerLite**
6. **Connect to HubSpot CRM**
7. **Create personalized video content**

## Tech Stack

- **Frontend**: Vanilla HTML/CSS/JavaScript
- **Charts**: Chart.js radar charts
- **Hosting**: GitHub Pages (free)
- **Automation**: n8n workflows
- **Email**: MailerLite integration
- **CRM**: HubSpot integration

---

**Ready to see it in action?** Visit your GitHub Pages URL and experience the elegant data maturity assessment results page! 