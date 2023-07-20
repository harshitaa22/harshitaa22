import { IS_DEBUG } from "../../env.json";
export function print_data(title: any) {
  if (IS_DEBUG) {
    console.log("==================" + JSON.stringify(title, null, 2));
  }
}
