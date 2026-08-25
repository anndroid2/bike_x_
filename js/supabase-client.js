(function () {
  var supabaseUrl = 'https://yvjdmfaretxseyzcwwia.supabase.co';
  var supabasePublishableKey = 'sb_publishable_LzjgKL5TMgGP8UG6hgE4qg_0e7R7WBY';
  var defaultBikexPublicUrl = 'https://anndroid2.github.io/xd';

  function getRuntimePublicUrl() {
    if (!window.location || window.location.protocol === 'file:') {
      return defaultBikexPublicUrl;
    }
    var path = window.location.pathname || '/';
    var basePath = '';

    if (path === '/' || !path) {
      basePath = '';
    } else if (path.slice(-1) === '/') {
      basePath = path.slice(0, -1);
    } else {
      var lastSlash = path.lastIndexOf('/');
      var lastSegment = path.slice(lastSlash + 1);
      // If the last segment looks like a file (contains extension), drop it.
      if (lastSegment.indexOf('.') !== -1) {
        basePath = path.slice(0, lastSlash);
      } else {
        basePath = path;
      }
    }

    return window.location.origin + basePath;
  }

  window.sb = window.supabase.createClient(supabaseUrl, supabasePublishableKey);
  window.bikexPublicUrl = getRuntimePublicUrl().replace(/\/$/, '');

  window.getSession = async function () {
    var result = await window.sb.auth.getSession();
    return result.data.session;
  };

  window.toBikeXSession = function (user) {
    var metadata = user.user_metadata || {};
    var name = metadata.name || user.email.split('@')[0];
    var company = metadata.company || '';
    var type = metadata.type || 'magan';

    return {
      email: user.email,
      name: name,
      company: company,
      type: type,
      displayName: type === 'elado' && company ? company : name
    };
  };

  window.bikexToast = function (message) {
    window.alert(message);
  };
}());