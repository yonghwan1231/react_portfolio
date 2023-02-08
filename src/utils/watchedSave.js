export function watchedSave(data, props) {
  if (!data) return;
  let watchedList = JSON.parse(localStorage.getItem('watched'));
  watchedList.unshift(data.name);
  watchedList = Array.from(new Set(watchedList));
  watchedList.length = 12
  localStorage.setItem('watched', JSON.stringify(watchedList));
  props.setRender(!props.render);
}