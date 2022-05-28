class CalendarAPI {
  constructor() {
    this.url = 'http://localhost:3005/meetings';
  }

  async loadMeetingsFromAPI() {
    return await this._fetch(this.url);
  }

  async addNewMeetingToAPI(data) {
    const options = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    };

    return await this._fetch(this.url, options);
  }

  async deleteMeetingFromAPI(id) {
    const options = {
      method: 'DELETE'
    };

    return await this._fetch(`${this.url}/${id}`, options);
  }

  _fetch(url, options) {
    return fetch(url, options)
      .then(resp => {
        if(resp.ok) {
          return resp.json();
        }
      })
      .then(data => {
        return data;
      })
      .catch(error => {
        throw new Error(error);
      })
  }
}

export default CalendarAPI;