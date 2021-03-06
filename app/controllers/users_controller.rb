class UsersController < ApplicationController

  def index
    @users = User.where('name LIKE(?)', "%#{params[:keyword]}%")
  end

  def edit
    redirect_to root_path, alert: "あなたには権限がありません" if params[:id].to_i != current_user.id
  end

  def update
    if current_user.update(user_params)
       redirect_to root_path, notice: 'ユーザー情報を更新しました。'

    else
      flash.now[:alert] = 'ユーザー情報の更新に失敗しました。'
      render :edit
    end

  end

  private
  def user_params
    params.require(:user).permit(:name, :email)
  end
end
